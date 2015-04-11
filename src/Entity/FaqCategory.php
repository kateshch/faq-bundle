<?php
namespace Kateshch\FaqBundle\Entity;


use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OrderBy;
use Werkint\Bundle\FrameworkExtraBundle\Model\Translatable;

/**
 * TODO: write "FaqCategory" info
 *
 * @author Kate Shcherbak <katescherbak@gmail.com>
 * @ORM\Entity(repositoryClass="FaqCategoryRepository")
 * @ORM\Table(name="app_faq_categories")
 *
 * Переводные методы:
 * @method FaqCategoryTranslation translate(string $lang)
 * @method string getTitle()
 * @method FaqCategoryTranslation setTitle(string $title)
 */
class FaqCategory
{
    use Translatable;

    /**
     *
     */
    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }

    protected $translations;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string",length=100, unique=true)
     *
     * @var string
     */
    protected $class;

    /**
     * @var FaqQuestion[]|Collection
     * @ORM\OneToMany(targetEntity="Kateshch\FaqBundle\Entity\FaqQuestion", mappedBy="category", cascade={"persist", "remove"})
     **/
    protected $questions;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return $this
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getClass()
    {
        return $this->class;
    }

    /**
     * @param string $class
     * @return $this
     */
    public function setClass($class)
    {
        $this->class = $class;
        return $this;
    }

    /**
     * @return Collection|FaqQuestion[]
     */
    public function getQuestions()
    {
        $crt = Criteria::create();
        /** @var Criteria $crt */
        $crt->orderBy(['mark' => $crt::DESC]);
        $questions = $this->questions;
        return $questions->matching($crt);
    }

    /**
     * @param Collection|FaqQuestion[] $questions
     * @return $this
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;
        return $this;
    }


}