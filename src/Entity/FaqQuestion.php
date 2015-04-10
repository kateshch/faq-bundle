<?php
namespace Kateshch\FaqBundle\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model\Timestampable\Timestampable;
use Symfony\Component\Validator\Constraints as Assert;
use Werkint\Bundle\FrameworkExtraBundle\Model\Translatable;

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


    protected $translations;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @var integer
     */
    protected $id;

    /**
     * @var FaqAnswer|null
     *
     * @ORM\OneToOne(targetEntity="Kateshch\FaqBundle\Entity\FaqAnswer", inversedBy="question")
     * @ORM\JoinColumn(name="ref_answer", referencedColumnName="id")
     */
    protected $answer;

    /**
     * @var string
     *
     * @ORM\Column(type="string",length=255)
     */
    protected $email;

    /**
     * @var FaqCategory|null
     *
     * @ORM\ManyToOne(targetEntity="Kateshch\FaqBundle\Entity\FaqCategory")
     * @ORM\JoinColumn(name="ref_category", referencedColumnName="id")
     */
    protected $category;

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

}
