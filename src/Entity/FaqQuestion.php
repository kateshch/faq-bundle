<?php
namespace Kateshch\FaqBundle\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model\Timestampable\Timestampable;
use Werkint\Bundle\FrameworkExtraBundle\Model\Translatable;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * TODO: write "FaqMessage" info
 *
 * @author Kate Shcherbak <katescherbak@gmail.com>
 *
 * @ORM\Entity(repositoryClass="FaqQuestionRepository")
 * @ORM\Table(name="app_faq_questions")
 *
 * Переводные методы:
 * @method FaqQuestionTranslation translate(string $lang)
 * @method string getMessage()
 * @method FaqQuestionTranslation setMessage(string $message)
 * @method string getName()
 * @method FaqQuestionTranslation setName(string $message)
 */
class FaqQuestion
{
    use Timestampable;
    use Translatable;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->setAnswer(new FaqAnswer());
        $this->setCategory(new FaqCategory());
    }

    /**
     * @Serializer\Type("array< Kateshch\FaqBundle\Entity\FaqQuestionTranslation>")
     * @Serializer\Accessor(getter="getATranslations", setter="setATranslations")
     * @Assert\Valid
     */
    protected $translations;

    /**
     * @Serializer\Accessor(getter="getName")
     * @Serializer\Type("string")
     */
    private $name;

    /**
     * @Serializer\Accessor(getter="getMessage")
     * @Serializer\Type("string")
     */
    private $message;


    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Type("integer")
     * @var integer
     */
    protected $id;

    /**
     * @var FaqAnswer|null
     * @Serializer\Type("Kateshch\FaqBundle\Entity\FaqAnswer")
     * @ORM\OneToOne(targetEntity="Kateshch\FaqBundle\Entity\FaqAnswer", cascade={"persist","remove"})
     * @ORM\JoinColumn(name="answer_id", referencedColumnName="id")
     */
    protected $answer;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Serializer\Type("float")
     * @var float
     */
    protected $mark;

    /**
     * @var string
     * @Serializer\Type("string")
     * @ORM\Column(type="string",length=255,nullable=true)
     */
    protected $email;

    /**
     * @var FaqCategory|null
     * @Serializer\Type("Kateshch\FaqBundle\Entity\FaqCategory")
     * @ORM\ManyToOne(targetEntity="Kateshch\FaqBundle\Entity\FaqCategory", cascade={"persist"})
     * @ORM\JoinColumn(name="ref_category", referencedColumnName="id")
     */
    protected $category;

    /**
     * @ORM\OneToOne(targetEntity="Kateshch\FaqBundle\Entity\File", cascade={"persist"})
     * @ORM\JoinColumn(name="file_id", referencedColumnName="id")
     * @Serializer\Type("Kateshch\FaqBundle\Entity\File")
     * @var File|null
     */
    protected $file;

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
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return $this
     */
    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }


    /**
     * @return FaqAnswer|null
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * @param FaqAnswer|null $answer
     * @return $this
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;
        return $this;
    }

    /**
     * @return FaqCategory|null
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param FaqCategory|null $category
     * @return $this
     */
    public function setCategory($category)
    {
        $this->category = $category;
        return $this;
    }

    /**
     * @return int
     */
    public function getMark()
    {
        return $this->mark;
    }

    /**
     * @param int $mark
     * @return $this
     */

    public function setMark($mark)
    {
        $this->mark = $mark;
        return $this;
    }

    /**
     * @return File|null
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * @param File|null $file
     * @return $this
     */
    public function setFile($file)
    {
        $this->file = $file;
        return $this;
    }




}
