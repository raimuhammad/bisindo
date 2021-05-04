<?php


namespace App\GraphQL;


use App\Models\Quiz;
use App\Shared\GraphqlResolver;
use Illuminate\Database\Eloquent\Model;

class QuizResolver extends GraphqlResolver
{
  protected function transformArguments(array $arguments)
  {
    $arguments['meta_data'] = json_encode($arguments['meta_data']);
    return parent::transformArguments($arguments);
  }

  public function getExcluded(array $array): array
  {
    return [];
  }
  public function makeModel(): Model
  {
    return Quiz::create($this->modelArguments);
  }
}
