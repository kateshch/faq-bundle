<?php

namespace Kateshch\FaqBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class FaqQuestionRepository extends EntityRepository
{

    /**
     *
     */
    public function findAllWithAnswer()
    {
        return $this->createQueryBuilder('q')->where('q.answer IS NOT NULL')->orderBy('q.mark', 'DESC')->getQuery()->getResult();
    }
}
