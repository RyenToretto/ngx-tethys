import { SchematicContext, Tree } from '@angular-devkit/schematics';

import { MigrationSchematicsRule } from '../../class/update-schematics';
import { ImportEntryPointChangeMigrationByNg11 } from './migrations/import-entry-point-change';
export default function main() {
    return (tree: Tree, ctx: SchematicContext) => {
        return MigrationSchematicsRule([ImportEntryPointChangeMigrationByNg11]);
    };
}
