<?php
namespace Kateshch\FaqBundle\Service\Twig;

use Symfony\Component\HttpFoundation\Request;
use Werkint\Bundle\FrameworkExtraBundle\Twig\AbstractExtension;

/**
 * @author Vladimir Odesskij <odesskij1992@gmail.com>
 */
class KateshchFaqBundleExtension extends AbstractExtension
{
    protected $vars;
    protected $locales;
    protected $request;

    protected $globals;


    const EXT_NAME = 'cms_core_bundle';

    /**
     * {@inheritdoc}
     */
    protected function init()
    {
        $this->vars += ['langlinks' => $this->getLangPaths()];
        $this->globals = ['var' => $this->vars,];
        $this->addFunction('fieldTypes', false, function () {
            return 'fake';
        });


    }

    /**
     * @param array $vars
     * @param Request|null $request
     * @param array $locales
     * @throws \Exception
     */
    public function __construct(
        array $vars, Request $request = null, array $locales
    )
    {
        $this->request = $request;
        $this->locales = $locales;
        $this->vars = $vars['params'];
        parent::__construct();
    }


    /**
     * @return string[]
     */
    protected function getLangPaths()
    {
        if (!$this->request) {
            return [];
        }
        $langPath = substr($this->request->getRequestUri(), 4);
        $langPath = $this->request->getScheme() . ':/' . $this->request->getHttpHost() . '/%s/' . str_replace('%', '%%', $langPath);
        $langs = [];
        foreach ($this->locales as $lang) {
            $langs[$lang] = sprintf($langPath, $lang);
        }
        return $langs;
    }

}
