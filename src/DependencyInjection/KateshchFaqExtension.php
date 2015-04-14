<?php

namespace Kateshch\FaqBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Processor;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Config\Resource\FileResource;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class KateshchFaqExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(
        array $configs,
        ContainerBuilder $container
    ) {
        $configDir = realpath(__DIR__ . '/../Resources/config');

        $processor = new Processor();
        $config = $processor->processConfiguration(
            new Configuration($this->getAlias()),
            $configs
        );

        $container->setParameter(
            $this->getAlias(),
            $config
        );

        $config['scriptsdir'] = __DIR__ . '/../Resources/scripts';

        $container->setParameter(
            $this->getAlias() . '.config_directory',
            $configDir
        );

        $container->setParameter(
            $this->getAlias() . '.jsmodeldir',
            realpath(__DIR__ . '/../Resources/scripts/jsmodel')
        );

        $loader = new YamlFileLoader(
            $container,
            new FileLocator(__DIR__ . '/../Resources/config')
        );
        $loader->load('services.yml');
        $loader->load('doctrine.yml');

    }

    /**
     * {@inheritdoc}
     */
    public function getConfiguration(array $config, ContainerBuilder $container)
    {
        $config = new Configuration($this->getAlias());
        $r = new \ReflectionClass($config);
        $container->addResource(new FileResource($r->getFileName()));
        return $config;
    }

}
