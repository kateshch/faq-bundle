<?php
namespace Kateshch\FaqBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Werkint\Bundle\FrameworkExtraBundle\Model\Translation;

/**
 * TODO: write "FaqCategoryTranslation" info
 *
 * @author Kate Shcherbak <katescherbak@gmail.com>
 *
 *
 * @ORM\Entity()
 * @ORM\Table(name="app_faq_categories_translations")
 */
class FaqCategoryTranslation
{
    use Translation;

    // -- Entity ---------------------------------------

    /**
     * @ORM\Column(type="string",length=200)
     * @var string
     */
    protected $title;

    // -- Accessors ---------------------------------------

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return $this
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return;
    }
}
