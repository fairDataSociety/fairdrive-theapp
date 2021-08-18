import { BaseAction } from './core/BaseAction';
import { ActionEnum } from './core/ActionsEnum';

export interface ActionSeedPhraseRequest extends BaseAction {
  type: ActionEnum.SEED_PHRASE_REQUEST;
  payload: undefined;
}

export interface ActionSeedPhraseSuccess extends BaseAction {
  type: ActionEnum.SEED_PHRASE_SUCCESS;
  payload: string;
}

export interface ActionSeedPhraseFailed extends BaseAction {
  type: ActionEnum.SEED_PHRASE_FAILED;
  payload: string;
}
