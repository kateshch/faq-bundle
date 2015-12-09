<?php
namespace Sdelka\Bundle\AppBundle\Service;

use Faker\Generator;

/**
 * @author Vladimir Odesskij <odesskij1992@gmail.com>
 */
class FakerFactory
{
    /**
     * @param string $locale
     * @return Generator
     */
    public function create($locale = \Faker\Factory::DEFAULT_LOCALE)
    {
        return \Faker\Factory::create($locale);
    }
}