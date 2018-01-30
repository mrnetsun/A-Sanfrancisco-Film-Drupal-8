<?php

namespace Drupal\film_sanfrancisco\Controller;

use Drupal\article\CommentService;
use Drupal\Core\Controller\ControllerBase;
use Drupal\image\Entity\ImageStyle;
use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\film_sanfrancisco\FilmService;
use Drupal\field_collection\Entity\FieldCollectionItem;

use Symfony\Component\HttpFoundation;
use Drupal\file\Entity\File;


class FilmController extends ControllerBase {

  /**
   * @var SolrService
   */
  protected $solrService;

  /**
   * @var \Drupal\Component\Serialization\Json
   */
  protected $serializer;

  protected $format = 'json';

  protected $google_api_key = 'AIzaSyCGPmKhlHjlz9p5JtsGBMf2T6Tq9TzOs-U';

  /**
   * @var HttpFoundation\Request
   */
  protected $request;

  /**
   * @var
   */
  protected $currentUser;

  public function __construct() {

   
    $this->serializer = new \Drupal\Component\Serialization\Json;
    $this->request = \Drupal::request();
    $this->currentUser = \Drupal::currentUser();
  }

  /**      *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The current request
   */
  public function search() {

      $form = \Drupal::formBuilder()->getForm('Drupal\film_sanfrancisco\Form\SearchFilm');

      return [
          '#theme' => 'film_layout',
          '#search_form' => $form,
      ];
  }
  
  

}