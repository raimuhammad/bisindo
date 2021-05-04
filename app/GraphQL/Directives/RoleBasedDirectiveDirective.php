<?php

namespace App\GraphQL\Directives;

use Closure;
use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Schema\Directives\GuardDirective;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\FieldResolver;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class RoleBasedDirectiveDirective extends GuardDirective
{

  private function resolveRoles() :array{
    $role = $this->directiveArgValue("with");
    $roles = $this->directiveArgValue("roles", []);
    return array_merge($role, $roles);
  }

  protected function authenticate(array $guards): void
  {
    $auth = $this->auth->guard($guards);
    $user = $auth->user();
    if (! $user->hasAnyRole($this->resolveRoles())){
      $this->unauthenticated($guards);
    }
  }

  public static function definition(): string
  {
    return /** @lang GraphQL */ <<<'GRAPHQL'
"""
Run authentication through one or more guards.
This is run per field and may allow unauthenticated
users to still receive partial results.
"""
directive @role(
  """
  Specify which role can use the field.
  """
  with: AppRole
  roles: [AppRole!]
) on FIELD_DEFINITION | OBJECT
GRAPHQL;
  }
}
