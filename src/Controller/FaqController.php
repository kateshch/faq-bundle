<?php
namespace Kateshch\FaqBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\DiExtraBundle\Annotation as DI;
use Kateshch\FaqBundle\Entity\FaqCategoryRepository;
use Kateshch\FaqBundle\Entity\FaqQuestion;
use Kateshch\FaqBundle\Entity\FaqQuestionRepository;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\ConstraintViolationListInterface;

/**
 * @author Kate Shcherbak <katescherbak@gmail.com>
 * @Rest\Route("/faq-bundle")
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

    /**
     * @DI\Inject("faq.repo.file")
     * @var EntityRepository
     */
    private $repoFile;


    /**
     * @Rest\Get("/api/categories", name="faq_bundle.categories" ,defaults={"_format": "json"})
     * @Rest\View()
     */
    public function listCategoryAction()
    {
        $categories = $this->repoFaqCategory->findAll();
        return $categories;
    }


    /**
     * @Rest\Get("/api/category/{category}", name="faq_bundle.category" ,defaults={"_format": "json"})
     * @Rest\View()
     */
    public function categoryAction($category)
    {
        $category = $this->repoFaqCategory->findOneBy(['class'=>$category]);
        return $category;
    }

    /**
     * @ApiDoc(
     *   description="Список вопросов с ответами"
     * )
     * @Rest\Get("/api/questions", name="faq_bundle.questions", defaults={"_format": "json"})
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
     * @Rest\Post("/api/question/new", name="faq_bundle.new_question", defaults={"_format": "json"})
     * @ParamConverter("faqQuestion", class="Kateshch\FaqBundle\Entity\FaqQuestion", converter="fos_rest.request_body")
     * @Rest\View()
     * @param FaqQuestion $faqQuestion
     * @param ConstraintViolationListInterface $validationErrors
     * @return FaqQuestion
     */
    public function saveQuestionAction(FaqQuestion $faqQuestion, ConstraintViolationListInterface $validationErrors, Request $request)
    {
        $errorsList = [];
        for ($i = 0; $i < count($validationErrors); $i++) {
            $errorsList[] = $validationErrors[$i]->getMessage();
        }
        if (!count($validationErrors)) {
            $this->manager->persist($faqQuestion);
            $this->manager->flush();
        }
        $ret = ['errors' => $errorsList, 'ok' => !count($validationErrors)];
        return $ret;
    }

    /**
     * @ApiDoc(
     *   description="Ставит оценку",
     * )
     * @Rest\Put("/api/addmark/{question}/{mark}", name="faq_bundle.add_mark", defaults={"_format": "json"})
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




