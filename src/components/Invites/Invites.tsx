import { FC, useEffect, useMemo, useState } from 'react';
import {
  deleteInviteLocally,
  getInvitesStatuses,
  Invite,
  InvitesStatuses,
  makeInviteUrl,
  updateInviteLocally,
} from '@utils/invite';
import Blockies from 'react-blockies';
import Key from '@media/UI/invite/key.png';
import NextImage from '@media/UI/invite/next.png';
import BackImage from '@media/UI/invite/back.png';
import EditImage from '@media/UI/invite/pencil.png';
import SaveImage from '@media/UI/invite/check-mark.png';
import DeleteImage from '@media/UI/invite/delete.png';
import DollarImage from '@media/UI/invite/dollar-sign.png';
import EmptyImage from '@media/UI/invite/empty.png';
import copy from 'copy-to-clipboard';
import { ConfirmDeleteModal } from '@components/Modals';
import InfoModal from '@components/Modals/InfoModal/InfoModal';
import classes from './Invites.module.scss';

interface AllInvitesProps {
  ownerAddress: string | undefined;
  invites: Invite[];
  updateInvites: () => void;
  onTopUpInvite: (invite: Invite) => void;
}

enum InviteMode {
  Edit = 'edit',
  Delete = 'delete',
}

/**
 * Invite status
 */
enum InviteStatus {
  /**
   * FDS account registered using an invite
   */
  Registered = 'registered',

  /**
   * User logged in via Metamask using an invite
   */
  LoggedIn = 'logged-in',

  /**
   * Invite not used yet
   */
  NotUsed = 'not-used',

  /**
   * Invite is private
   */
  Private = 'private',
}

/**
 * Invite status text
 */
enum InviteStatusText {
  /**
   * FDS account registered using an invite
   */
  'registered' = 'FDS account registered',

  /**
   * User logged in via Metamask using an invite
   */
  'logged-in' = 'User logged in via Metamask',

  /**
   * Invite not used yet
   */
  'not-used' = 'Invite not used yet',

  /**
   * Invite is private
   */
  'private' = 'Invite is private',
}

export const ITEMS_PER_PAGE = 6;

const Invites: FC<AllInvitesProps> = ({
  ownerAddress,
  invites,
  updateInvites,
  onTopUpInvite,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeInvite, setActiveInvite] = useState<Invite>(null);
  const [inviteMode, setInviteMode] = useState<InviteMode>(null);
  const [newInviteName, setNewInviteName] = useState('');
  const [hoverInviteId, setHoverInviteId] = useState<string | null>(null);
  const [showCopiedModal, setShowCopiedModal] = useState<boolean>(false);
  const [invitesStatuses, setInvitesStatuses] = useState<InvitesStatuses>({});

  const setInviteAction = (invite: Invite, inviteMode: InviteMode) => {
    setNewInviteName('');
    setActiveInvite(invite);
    setInviteMode(inviteMode);
  };

  const resetInviteAction = () => {
    setNewInviteName('');
    setActiveInvite(null);
    setInviteMode(null);
  };

  const handleSaveClick = () => {
    updateInviteLocally({ ...activeInvite, name: newInviteName });
    setActiveInvite(null);
    setNewInviteName('');
    if (updateInvites) {
      updateInvites();
    }
  };

  const paginatedInvites = useMemo(() => {
    return invites.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
    );
  }, [invites, currentPage]);

  const nextPage = () => {
    setCurrentPage((oldPage) =>
      Math.min(oldPage + 1, Math.ceil(invites.length / ITEMS_PER_PAGE) - 1)
    );
  };

  const previousPage = () => {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 0));
  };

  const getActionClasses = (invite: Invite) =>
    `flex-item cursor-pointer text-color-accents-purple-black dark:brighten dark:text-color-shade-white-night ${
      hoverInviteId === invite.id ? '' : 'hidden'
    }`;

  const isPreviousButtonDisabled = currentPage === 0;
  const isNextButtonDisabled =
    currentPage >= Math.ceil(invites.length / ITEMS_PER_PAGE) - 1;

  /**
   * Get invite status class and text
   *
   * @param invite Invite
   */
  const getInviteStatus = (invite: Invite) => {
    const inviteStatus = invitesStatuses[invite.address.toLowerCase()];
    let status: InviteStatus;
    if (!inviteStatus) {
      status = InviteStatus.Private;
    } else if (!inviteStatus.isExists) {
      status = InviteStatus.Private;
    } else if (inviteStatus.isAccountCreated) {
      status = InviteStatus.Registered;
    } else if (inviteStatus.isUsed) {
      status = InviteStatus.LoggedIn;
    } else {
      status = InviteStatus.NotUsed;
    }

    const inviteStatusText = InviteStatusText[status];
    return {
      inviteStatusClass: classes[status],
      inviteStatusText: inviteStatusText
        ? inviteStatusText
        : 'Status is not available',
    };
  };

  useEffect(() => {
    if (!paginatedInvites || paginatedInvites.length === 0 || !ownerAddress) {
      return;
    }

    async function start() {
      try {
        const newData = await getInvitesStatuses(
          ownerAddress,
          paginatedInvites
        );
        setInvitesStatuses((data) => ({ ...data, ...newData }));
      } catch (e) {
        console.error('Information about invites can not be retrieved', e);
      }
    }

    start();
  }, [paginatedInvites, ownerAddress]);

  return (
    <div>
      <ul
        className={`max-w-md ${
          paginatedInvites.length > 0 ? 'divide-y dark:divide-gray-400' : ''
        }`}
      >
        {paginatedInvites.length === 0 && (
          <div className="flex items-center">
            <img
              className="mr-4 dark:brighten"
              src={EmptyImage.src}
              alt="Address book is empty"
              width={40}
            />
            <p className="text-gray-400 text-sm">No invites here</p>
          </div>
        )}
        {paginatedInvites.map((invite) => {
          const inviteStatus = getInviteStatus(invite);
          return (
            <li
              className="pb-3 sm:pb-4"
              key={invite.id}
              onMouseEnter={() => {
                setHoverInviteId(invite.id);
              }}
              onMouseLeave={() => {
                setHoverInviteId(null);
              }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className="flex-shrink-0"
                  style={{
                    position: 'relative',
                  }}
                >
                  <Blockies
                    className="inline-block rounded-full"
                    seed={invite.address}
                  />
                  <span
                    className={`absolute block rounded-full ${classes['invite-status']} ${inviteStatus.inviteStatusClass}`}
                    title={inviteStatus.inviteStatusText}
                  ></span>
                </div>
                <div className="flex-1 min-w-0">
                  {inviteMode === InviteMode.Edit &&
                  activeInvite?.id === invite.id ? (
                    <div className="flex items-center">
                      <input
                        className="flex-item mb-3 block w-full mt-1 p-3 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
                        value={newInviteName}
                        onChange={(e) => setNewInviteName(e.target.value)}
                        autoFocus
                      />
                      <button
                        className="flex-item mb-3"
                        onClick={() => handleSaveClick()}
                      >
                        <img
                          className="dark:brighten"
                          src={SaveImage.src}
                          alt="Save changes"
                          width={32}
                        />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center edit-container">
                      <p className="text-sm font-medium truncate text-color-accents-purple-black dark:text-color-shade-white-night flex-item whitespace-nowrap">
                        {invite.name || invite.id}
                      </p>
                      <img
                        className={getActionClasses(invite)}
                        width={15}
                        src={EditImage.src}
                        alt="Edit the name"
                        onClick={() => setInviteAction(invite, InviteMode.Edit)}
                      />
                      <img
                        className={getActionClasses(invite)}
                        width={15}
                        src={DeleteImage.src}
                        alt="Delete the invite"
                        onClick={() =>
                          setInviteAction(invite, InviteMode.Delete)
                        }
                      />
                      {/*<img*/}
                      {/*  className={getActionClasses(invite)}*/}
                      {/*  width={18}*/}
                      {/*  src={DollarImage.src}*/}
                      {/*  alt="Top Up the invite"*/}
                      {/*  onClick={() => onTopUpInvite && onTopUpInvite(invite)}*/}
                      {/*/>*/}
                    </div>
                  )}
                  <div
                    className="flex items-center text-sm"
                    onClick={() => {
                      copy(makeInviteUrl(invite.invite));
                      setShowCopiedModal(true);
                    }}
                  >
                    <div>
                      <img
                        className="flex-item cursor-pointer text-color-accents-purple-black dark:text-color-shade-white-night dark:brighten"
                        src={Key.src}
                        alt="Click to copy the invite"
                        width={15}
                      />
                    </div>
                    <div
                      className="flex-item truncate cursor-pointer blurred-text"
                      title="Click to copy the invite"
                    >
                      0x5416f2b3c072a29e577b6fcfa2230671958aaa4c759bb2e37d4bd647632aa76c
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        <li>
          {invites.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center space-x-8 mt-4">
              <button
                className={`pagination-button ${
                  !isPreviousButtonDisabled ? '' : 'text-gray-400'
                }`}
                onClick={previousPage}
                disabled={isPreviousButtonDisabled}
              >
                <img
                  className={`pagination-image dark:brighten ${
                    isPreviousButtonDisabled ? 'muted-image' : ''
                  }`}
                  src={BackImage.src}
                  alt="Previous page"
                />
              </button>
              <button
                className={`pagination-button ${
                  !isNextButtonDisabled ? '' : 'text-gray-400'
                }`}
                onClick={nextPage}
                disabled={isNextButtonDisabled}
              >
                <img
                  className={`pagination-image dark:brighten ${
                    isNextButtonDisabled ? 'muted-image' : ''
                  }`}
                  src={NextImage.src}
                  alt="Next page"
                />
              </button>
            </div>
          )}
        </li>
      </ul>

      {inviteMode === InviteMode.Delete ? (
        <ConfirmDeleteModal
          showModal={inviteMode === InviteMode.Delete}
          closeModal={resetInviteAction}
          type="Invite"
          name={activeInvite?.name || activeInvite?.id}
          deleteHandler={() => {
            deleteInviteLocally(activeInvite.id);
            if (updateInvites) {
              updateInvites();
            }

            resetInviteAction();
          }}
        />
      ) : null}

      {showCopiedModal && (
        <InfoModal
          closeModal={() => setShowCopiedModal(false)}
          header="URL copied"
          showModal={showCopiedModal}
          content="The invite URL has been copied to the clipboard"
        />
      )}
    </div>
  );
};

export default Invites;
