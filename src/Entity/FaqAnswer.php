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
 * @ORM\Entity(repositoryClass="FaqAnswerRepository")
 * @ORM\Table(name="app_faq_answer")
 *
 * Переводные методы:
 * @method FaqAnswerTranslation translate(string $lang)
 * @method string getMessage()
 * @method FaqAnswerTranslation setMessage(string $message)
 */
class FaqAnswer
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
     * @var FaqQuestion|null
     * @ORM\OneToOne(targetEntity="Kateshch\FaqBundle\Entity\FaqQuestion", mappedBy="answer")
     */
    protected $question;

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
     * @return null|FaqQuestion
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * @param null|FaqQuestion $question
     * @return $this
     */
    public function setQuestion($question)
    {
        $this->question = $question;
        return $this;
    }




    /******************* Accessories *****************/


}
