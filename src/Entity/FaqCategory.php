<?php
namespace Kateshch\FaqBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OrderBy;
use Werkint\Bundle\FrameworkExtraBundle\Model\Translatable;
use JMS\Serializer\Annotation as Serializer;
use Kateshch\FaqBundle\Entity\FaqQuestion;

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
     * Constructor
     */
    public function __construct()
    {
        $this->setQuestions(new ArrayCollection());
    }
    /**
     * @Serializer\Type("array< Kateshch\FaqBundle\Entity\FaqCategoryTranslation>")
     * @Serializer\Accessor(getter="getATranslations", setter="setATranslations")
     */

    protected $translations;

    /**
     * @Serializer\Accessor(getter="getTitle")
     * @Serializer\Type("string")
     */
    private $title;


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
        return $this->questions;
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

    /**
     * @return array|array[]
     * @Serializer\VirtualProperty()
     * @Serializer\SerializedName("activeQuestions")
     */
    public function getActiveQuestions()
    {
        return $this->getQuestions()?$this->getQuestions()->filter(function (FaqQuestion $question) {
            return ($question->getAnswer() && $question->getAnswer()->getMessage()) ;
        }):[];
    }


}