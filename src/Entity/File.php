<?php
namespace Kateshch\FaqBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\Timestampable;
use JMS\Serializer\Annotation as Serializer;

/**
 * File Entity.
 *
 * @author Vladimir Odesskij <odesskij1992@gmail.com>
 * @ORM\Entity(repositoryClass="FileRepository")
 * @ORM\Table(name="app_faq_file")
 */
class File
{
    use Timestampable;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @var integer
     */
    protected $id;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @var string
     */
    protected $extension;

    /**
     * @ORM\Column(type="string",nullable=true)
     * @var string
     */
    protected $basename;

    /**
     * @ORM\Column(type="string",nullable=true)
     * @var string
     */
    protected $uri;



    // -- Accessors ---------------------------------------

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getExtension()
    {
        return $this->extension;
    }

    /**
     * @param string $extension
     * @return $this
     */
    public function setExtension($extension)
    {
        $this->extension = $extension;
        return $this;
    }

    /**
     * @return string
     */
    public function getUri()
    {
        return $this->uri;
    }

    /**
     * @param string $uri
     * @return $this
     */
    public function setUri($uri)
    {
        $this->uri = $uri;
        return $this;
    }


}
