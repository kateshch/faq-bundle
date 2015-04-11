<?php
namespace Kateshch\FaqBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\Persistence\ObjectManager;
use Kateshch\FaqBundle\Entity\FaqCategory;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Yaml\Yaml;

/**
 * TODO: write "LoadFaqCategoryData" info
 *
 * @author Kate Shcherbak <katescherbak@gmail.com>
 */
class LoadFaqCategoryData extends AbstractFixture implements
    ContainerAwareInterface
{

    /** @var ContainerInterface */

    protected $container;

    /**
     * {@inheritdoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * @return ContainerInterface
     */
    public function getContainer()
    {
        return $this->container;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        foreach ($this->getData() as $name => $drow) {

            $row = new FaqCategory();
            // Load base properties

            $row->setClass($drow['class']);

            // Load localizations
            foreach ($drow['titles'] as $lang => $title) {
                $row->translate($lang)->setTitle($title);
            }
            $row->mergeNewTranslations();
            $manager->persist($row);

            // Create reference
            $this->addReference('faq-category-' . $drow['class'], $row);
        }

        $manager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 2;
    }

    /**
     * @return array
     */
    protected function getData()
    {
        $path = $this->getContainer()->getParameter('kateshch_faq.config_directory');
        $path .= '/data/faq-categories.yml';

        $data = Yaml::parse(file_get_contents($path));

        return $data;
    }

}
