<?php
namespace Kateshch\FaqBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use JMS\DiExtraBundle\Annotation as DI;
use Kateshch\FaqBundle\Entity\FaqAnswer;
use Kateshch\FaqBundle\Entity\FaqCategory;
use Kateshch\FaqBundle\Entity\FaqCategoryRepository;
use Kateshch\FaqBundle\Entity\FaqQuestion;
use Kateshch\FaqBundle\Entity\FaqQuestionRepository;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;

/**
 * @author Kate Shcherbak <katescherbak@gmail.com>
 *
 * @Rest\Route("/edit")
 */
class AdminController
{
    /**
     * @DI\Inject("doctrine.orm.entity_manager")
     * @var EntityManagerInterface
     */
    private $manager;

    /**
     * @DI\Inject("faq.repo.question")
     * @var FaqQuestionRepository
     */
    private $repoFaqQuest;

    /**
     * @DI\Inject("faq.repo.category")
     * @var FaqCategoryRepository
     */
    private $repoFaqCategory;


    // -- Action ---------------------------------------
    /**
     * @ApiDoc(
     *   description="Главная админка"
     * )
     * @Rest\Get("", name="faq_admin_index")
     * @Rest\View()
     */
    public function indexAction()
    {
        [];
    }

    /**
     * @Rest\Get("/category", name="faq_admin_categories" ,defaults={"_format": "json"})
     * @Rest\View()
     */
    public function listCategoryAction()
    {
        $categories = $this->repoFaqCategory->findAll();
        return $categories;
    }

    /**
     * @Rest\Get("/questions", name="faq_admin_questions",defaults={"_format": "json"})
     * @Rest\View()
     */
    public function listQuestionsAction()
    {
        $questions = $this->repoFaqQuest->findAll();
        return $questions;
    }

    /**
     * @Rest\Get("/answer/new/{question}", name="faq_answer_new", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function newAnswerAction()
    {
        return new FaqAnswer();
    }

    /**
     * @ApiDoc(
     *   description="Добавляет ответ"
     * )
     * @Rest\Post("/answer/new/{question}", name="faq_save_answer", defaults={"_format": "json"})
     * @ParamConverter("faqAnswer", class="Kateshch\FaqBundle\Entity\FaqAnswer", converter="fos_rest.request_body")
     * @Rest\View()
     */
    public function saveAnswerAction(FaqAnswer $faqAnswer, FaqQuestion $question, Request $request)
    {
        $question->setAnswer($faqAnswer);
        $this->manager->persist($question);
        $this->manager->flush();
        return $question;
    }

    /**
     * @ApiDoc(
     *   description="Удаляет ответ"
     * )
     * @Rest\Put("/answer/delete/{question}", name="faq_delete_answer", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function deleteAnswerAction(FaqQuestion $question, Request $request)
    {
        $answer = $question->getAnswer();
        $question->setAnswer(null);
        $this->manager->remove($answer);
        $this->manager->flush();
        return $question;
    }

    /**
     * @Rest\Get("/api/category", name="faq_category_api", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function newCategoryAction()
    {
        return new FaqCategory();
    }

    /**
     * @ApiDoc(
     *   description="Добавление категории"
     * )
     * @Rest\Post("/api/category", defaults={"_format": "json"})
     * @ParamConverter("faqCategory", class="Kateshch\FaqBundle\Entity\FaqCategory", converter="fos_rest.request_body")
     * @Rest\View()
     */
    public function saveCategoryAction(FaqCategory $faqCategory, Request $request)
    {
        $this->manager->persist($faqCategory);
        $this->manager->flush();
        return $faqCategory;
    }

    /**
     * @ApiDoc(
     *   description="Получение кактегории"
     * )
     * @Rest\Get("/api/category/{category}", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function getCategoryAction(FaqCategory $category, Request $request)
    {
        return $category;
    }

    /**
     * @ApiDoc(
     *   description="Редактирование категории"
     * )
     * @Rest\Put("/api/category/{category}", defaults={"_format": "json"})
     * @ParamConverter("faqCategory", class="Kateshch\FaqBundle\Entity\FaqCategory", converter="fos_rest.request_body")
     * @Rest\View()
     */
    public function editCategoryAction(FaqCategory $faqCategory, Request $request)
    {
        $this->manager->persist($faqCategory);
        $this->manager->flush();
        return $faqCategory;
    }

    /**
     * @ApiDoc(
     *   description="Удаление категории"
     * )
     * @Rest\Delete("/api/category/{category}", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function deleteCategoryAction(FaqCategory $category, Request $request)
    {
        $this->manager->remove($category);
        $this->manager->flush();
        return $category;
    }

    /**
     * @Rest\Get("/api/question", name="faq_question_api", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function newQuestionAction()
    {
        return new FaqQuestion();
    }


    /**
     * @ApiDoc(
     *   description="Редактирует вопрос"
     * )
     * @Rest\Get("/api/question/{question}", defaults={"_format": "json"})
     * @Rest\View()
     */
    public function getQuestionAction(FaqQuestion $question, Request $request)
    {
        return $question;
    }

    /**
     * @ApiDoc(
     *   description="Редактирует вопрос"
     * )
     * @Rest\Put("/api/question/{question}", defaults={"_format": "json"})
     * @ParamConverter("question", class="Kateshch\FaqBundle\Entity\FaqQuestion", converter="fos_rest.request_body")
     * @Rest\View()
     */
    public function editQuestionAction(FaqQuestion $question, Request $request)
    {

        $this->editTranslationQuestionAction($question,$request);
        $this->manager->persist($question);
        $this->manager->flush();
        return $question;
    }

    /**
     * @ApiDoc(
     *   description="Новый вопрос"
     * )
     * @Rest\Post("/api/question", defaults={"_format": "json"})
     * @ParamConverter("faqQuestion", class="Kateshch\FaqBundle\Entity\FaqQuestion", converter="fos_rest.request_body")
     * @Rest\View()
     */
    public function saveQuestionAction(FaqQuestion $faqQuestion, Request $request)
    {
        $this->manager->persist($faqQuestion);
        $this->manager->flush();
        return $faqQuestion;
    }

    /**
     * @ApiDoc(
     *   description="Удаление вопроса"
     * )
     * @Rest\Delete("/api/question/{question}",  defaults={"_format": "json"})
     * @Rest\View()
     */
    public function deleteQuestionAction(FaqQuestion $question, Request $request)
    {
        $this->manager->remove($question);
        $this->manager->flush();
        return $question;
    }


    public function editTranslationQuestionAction(FaqQuestion $question, Request $request)
    {
        $translations = $request->get('translations');
        $answerTranslations = $request->get('answer')['translations'];
        foreach($translations as $translation){
            $question->translate($translation['locale'])
                ->setMessage($translation['message']);
        };
        foreach($answerTranslations as $translation){
            $question->getAnswer()->translate($translation['locale'])
                ->setMessage($translation['message']);
        };
        $question->getAnswer()->mergeNewTranslations();
    }


}



