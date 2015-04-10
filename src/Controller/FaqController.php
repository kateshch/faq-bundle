<?php
namespace Kateshch\FaqBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Kateshch\FaqBundle\Entity\FaqCategory;
use Kateshch\FaqBundle\Entity\FaqCategoryRepository;
use JMS\DiExtraBundle\Annotation as DI;

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


    // -- Action ---------------------------------------
    /**
     * @Rest\Get("/all", name="app_faq_index", defaults={"keywords" = ""})
     * @Rest\View()
     */
    public function listAction()
    {
        $categories = $this->repoFaqCategory->findAll();

        return ['categories' => $categories];
    }


}




