<?php

namespace Kateshch\FaqBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;
use Doctrine\ORM\Mapping as ORM;

/**
 *
 * @ORM\Entity()
 * @ORM\Table(name="app_faq_answer_translations")
 */
class FaqAnswerTranslation
{
    use ORMBehaviors\Translatable\Translation;

    /**
     * @var string
     *
     * @ORM\Column(type="text",length=200, nullable=true)
     */
    protected $message;


    public function isEmpty()
    {
        return !$this->message;
    }


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
