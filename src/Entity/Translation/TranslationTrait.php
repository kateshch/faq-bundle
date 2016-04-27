<?php
namespace Kateshch\FaqBundle\Entity\Translation;

use JMS\Serializer\Annotation as Serializer;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;

/**
 * TODO: write "Translation" info
 *
 * @author Kate Shcherbak <katescherbak@gmail.com>
 */
trait TranslationTrait
{
    use ORMBehaviors\Translatable\TranslationMethods;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    /**
     *
     * @ORM\Column(name="locale", type="string")
     * @Serializer\Type("string")
     */
    protected $locale;

    /**
     * Will be mapped to translatable entity
     * by TranslatableSubscriber
     */
    protected $translatable;
}