<?php
namespace Kateshch\FaqBundle\Service\Util;

use Werkint\Bundle\RequireJSBundle\Service\Jsmodel\JsmodelProviderInterface;

/**
 * Добавляет модули бандла к requirejs
 *
 * @author Bogdan Yurov <bogdan@yurov.me>
 */
class JsmodelProvider implements
    JsmodelProviderInterface
{
    protected $jsmodelDir;

    /**
     * @param string $jsmodelDir
     */
    public function __construct(
        $jsmodelDir
    ) {
        $this->jsmodelDir = $jsmodelDir;
    }

    /**
     * @return string
     */
    public function getPaths()
    {
        return [
            [$this->jsmodelDir, ''],
        ];
    }
}