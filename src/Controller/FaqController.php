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
     *   description="Список категорий"
     * )
     * @Rest\Get("/list", name="faq_category_index",  defaults={"_format": "json"})
     * @Rest\View()
     */
    public function listAction()
    {
        $categories = $this->repoFaqCategory->findAll();
        return ['categories' => $categories];
    }

    /**
     * @ApiDoc(
     *   description="Список вопросов с ответами"
     * )
     * @Rest\Get("/questions", name="faq_question_index", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function getQuestionsAction()
    {
        $categories = $this->repoFaqCategory->findAll();
        $questions = $this->repoFaqQuest->findAllWithAnswer();
        return ['categories' => $categories, 'questions' => $questions];
    }

    /**
     * @Rest\Get("/question/new/{category}", name="faq_question_new", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function newQuestionAction()
    {
        return new FaqQuestion();
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
    public function saveQuestionAction(FaqQuestion $faqQuestion, $category)
    {
        $category = $this->repoFaqCategory->find($category);
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
    public function addMarkAction($question, $mark)
    {
        $question = $this->repoFaqQuest->find($question);
        $mark = $question->getMark() + $mark;
        $question->setMark($question->getMark() + $mark);
        $this->manager->persist($question);
        $this->manager->flush();
        return $question;
    }


}




