<?php
namespace Kateshch\FaqBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;
use Werkint\Bundle\FrameworkExtraBundle\Model\Translation;

/**
 *
 * @ORM\Entity()
 * @ORM\Table(name="app_faq_answer_translations")
 */
class FaqAnswerTranslation
{
    use Translation;

    /**
     * @var string
     *
     * @ORM\Column(type="text",length=200, nullable=true)
     */
    protected $message;

    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param string $message
     * @return $this
     */
    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }


}
