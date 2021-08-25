type TaggedState<T extends string> = { tag: T };

export enum StateTagsEnum {
  INITIAL = 'INITIAL',
  POD_OPENED = 'POD_OPENED',
  DIRECTORY_OPENED = 'DIRECTORY_OPENED',
}

// States
export type Initial = TaggedState<StateTagsEnum.INITIAL>;
export type PodOpened = TaggedState<StateTagsEnum.POD_OPENED>;
export type DirectoryOpened = TaggedState<StateTagsEnum.DIRECTORY_OPENED>;

export type State = Initial | PodOpened | DirectoryOpened;
