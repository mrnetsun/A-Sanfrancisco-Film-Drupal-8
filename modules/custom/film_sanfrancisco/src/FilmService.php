<?php

namespace Drupal\film_sanfrancisco;

use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Database\Connection;
use Solarium;
use Symfony\Component\Config\Definition\Exception\Exception;
use Drupal\file\Entity\File;

class FilmService implements FilmServiceInterface {

  protected $connection = NULL;
 
  public function __construct(Connection $connection) {

    $this->connection = $connection;
     
  }

   
}