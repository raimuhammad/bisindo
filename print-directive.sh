php artisan lighthouse:ide-helper;
sed -i 's/repeatable//g' schema-directives.graphql;
sed -i 's/RulesMessageMap/[String!]/g' schema-directives.graphql;
sed -i 's/Mixed/[String]/g' schema-directives.graphql