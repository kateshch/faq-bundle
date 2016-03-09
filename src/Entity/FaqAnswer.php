<?php
namespace Kateshch\FaqBundle\Entity;

use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model\Timestampable\Timestampable;
use Werkint\Bundle\FrameworkExtraBundle\Model\Translatable;

use JMS\Serializer\Annotation as Serializer;

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



    /**
     * @Serializer\Type("array< Kateshch\FaqBundle\Entity\FaqAnswerTranslation>")
     * @Serializer\Groups({"=read or g('create') or g('edit')"})
     * @Serializer\Accessor(getter="getATranslations", setter="setATranslations")
     */
    protected $translations;

    /**
     * @Serializer\Accessor(getter="getMessage")
     * @Serializer\Type("string")
     * @Serializer\Groups({"=read"})
     */
    private $message;



    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"=read"})
     * @var integer
     */
    protected $id;

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
