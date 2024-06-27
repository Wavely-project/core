import { Knex } from 'knex';

import { CreateWorkspace, UpdateWorkspace } from './workspaceModel';
import { workspaceRepository } from './workspaceRepository';

const workspaceService = {
	create: (workspaceData: CreateWorkspace, trx: Knex.Transaction) => {
		return workspaceRepository.create(workspaceData, trx);
	},
	getById: (workspaceId: number, trx: Knex.Transaction) => {
		return workspaceRepository.getById(workspaceId, trx);
	},
	getByIds: (workspaceIds: number[], trx: Knex.Transaction) => {
		return workspaceRepository.getByIds(workspaceIds, trx);
	},
	update: (
		workspaceId: number,
		workspaceData: UpdateWorkspace,
		trx: Knex.Transaction
	) => {
		return workspaceRepository.update(workspaceId, workspaceData, trx);
	},
	delete: (workspaceId: number, trx: Knex.Transaction) => {
		return workspaceRepository.delete(workspaceId, trx);
	},
};

export default workspaceService;
