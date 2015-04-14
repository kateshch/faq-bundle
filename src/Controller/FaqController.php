<?php
namespace Kateshch\FaqBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Kateshch\FaqBundle\Entity\FaqCategory;
use Kateshch\FaqBundle\Entity\FaqCategoryRepository;
use JMS\DiExtraBundle\Annotation as DI;
use Kateshch\FaqBundle\Entity\FaqQuestion;
use Kateshch\FaqBundle\Entity\FaqQuestionRepository;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\ConstraintViolationListInterface;

/**
 * TODO: write "FaqController" info
 *
 * @author Kate Shcherbak <katescherbak@gmail.com>
 */
class FaqController
{
    /**
     * @DI\Inject("doctrine.orm.entity_manager")
     * @var EntityManagerInterface
     */
    private $manager;

    /**
     * @DI\Inject("service_container")
     * @var ContainerInterface;
     */
    private $container;

    /**
     * @DI\Inject("faq.repo.category")
     * @var FaqCategoryRepository
     */
    private $repoFaqCategory;

    /**
     * @DI\Inject("%kateshch_faq%")
     * @var array
     */
    private $config;

    /**
     * @DI\Inject("faq.repo.question")
     * @var FaqQuestionRepository
     */
    private $repoFaqQuest;


    // -- Action ---------------------------------------
    /**
     * @ApiDoc(
     *   description="Список категорий c вопросами"
     * )
     * @Rest\Get("/", name="faq_index",  defaults={"_format": "json"})
     * @Rest\View()
     */
    public function indexAction()
    {
        return [];
    }


    /**
     * @Rest\Get("/category", name="faq_categories" ,defaults={"_format": "json"})
     * @Rest\View()
     */

    public function listCategoryAction()
    {
        $categories = $this->repoFaqCategory->findAll();
        return $categories;
    }



    /**
     * @ApiDoc(
     *   description="Список вопросов с ответами"
     * )
     * @Rest\Get("/questions", name="faq_question_index", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function listQuestionsAction()
    {
        $categories = $this->repoFaqCategory->findAll();
        $questions = $this->repoFaqQuest->findAllWithAnswer();
        return ['categories' => $categories, 'questions' => $questions];
    }



    /**
     * @ApiDoc(
     *   description="Добавляет вопрос",
     *   input="\Kateshch\FaqBundle\Entity\FaqQuestion"
     * )
     * @Rest\Post("/question/new/{category}",  defaults={"_format": "json"})
     * @ParamConverter("faqQuestion", class="Kateshch\FaqBundle\Entity\FaqQuestion", converter="fos_rest.request_body")
     * @Rest\View()
     */
    public function saveQuestionAction(FaqQuestion $faqQuestion,FaqCategory $category)
    {
        $faqQuestion->setCategory($category);
        $this->manager->persist($faqQuestion);
        $this->manager->flush();
        return $faqQuestion;
    }

    /**
     * @ApiDoc(
     *   description="Ставит оценку",
     * )
     * @Rest\Put("/addmark/{question}/{mark}", name="faq_add_mark", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function addMarkAction(FaqQuestion $question, $mark)
    {
        $mark = $question->getMark() + $mark;
        $question->setMark($mark);
        $this->manager->flush();
        return $question;
    }


}




