<?php
/**
 * Created by PhpStorm.
 * User: USER
 * Date: 1/30/2018
 * Time: 9:59 AM
 */

namespace Drupal\film_sanfrancisco\Form;

use DateTime;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Site\Settings;
use Drupal\Core\Url;


class SearchFilm extends FormBase
{

    /**
     * {@inheritdoc}
     */
    public function getFormId()
    {
        return 'frm_search_film';
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state)
    {
        $form['keyword'] = [
            '#type' => 'textfield',
            '#title' => $this->t('Keyword'),
            '#size' => 20,
            '#default_value' => '',
        ];

        $form['cmdSearch'] = [
            '#type' => 'submit',
            '#default_value' => $this->t('Search'),
        ];

        return $form;
    }

    /**
     * {@inheritdoc}
     */
    public function validateForm(array &$form, FormStateInterface $form_state)
    {
        parent::validateForm($form, $form_state);
    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state)
    {

    }
}