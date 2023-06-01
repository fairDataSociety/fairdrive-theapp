import { FC, useState } from 'react';
import {
  deleteInviteLocally,
  Invite,
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

interface AllInvitesProps {
  invites: Invite[];
  updateInvites: () => void;
  onTopUpInvite: (invite: Invite) => void;
}

export const ITEMS_PER_PAGE = 6;

const Invites: FC<AllInvitesProps> = ({
  invites,
  updateInvites,
  onTopUpInvite,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  // keep track of the invite being edited
  const [editingInvite, setEditingInvite] = useState<Invite>(null);
  const [editingInviteName, setEditingInviteName] = useState('');
  const [hoverInviteId, setHoverInviteId] = useState<string | null>(null);

  const handleEditClick = (invite: Invite) => {
    setEditingInvite(invite);
    setEditingInviteName(invite.name || invite.id);
  };

  const handleDeleteClick = (invite: Invite) => {
    if (!window.confirm('Are you sure you want to delete this invite?')) {
      return;
    }

    deleteInviteLocally(invite.id);
    if (updateInvites) {
      updateInvites();
    }
  };

  const handleSaveClick = () => {
    updateInviteLocally({ ...editingInvite, name: editingInviteName });
    setEditingInvite(null);
    setEditingInviteName('');
    if (updateInvites) {
      updateInvites();
    }
  };

  const paginatedInvites = invites.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    setCurrentPage((oldPage) =>
      Math.min(oldPage + 1, Math.ceil(invites.length / ITEMS_PER_PAGE) - 1)
    );
  };

  const previousPage = () => {
    setCurrentPage((oldPage) => Math.max(oldPage - 1, 0));
  };

  const isPreviousButtonDisabled = currentPage === 0;
  const isNextButtonDisabled =
    currentPage >= Math.ceil(invites.length / ITEMS_PER_PAGE) - 1;

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
              className="mr-4"
              src={EmptyImage.src}
              alt="Address book is empty"
              width={40}
            />
            <p className="text-gray-400 text-sm">No invites here</p>
          </div>
        )}
        {paginatedInvites.map((invite) => (
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
              <div className="flex-shrink-0">
                <Blockies
                  className="inline-block rounded-full"
                  seed={invite.address}
                />
              </div>
              <div className="flex-1 min-w-0">
                {editingInvite?.id === invite.id ? (
                  <div className="flex items-center">
                    <input
                      className="flex-item mb-3 block w-full mt-1 p-3 font-normal text-xs bg-color-shade-dark-4-day dark:bg-color-shade-dark-2-night border dark:text-color-shade-black-day border-color-shade-black-day dark:border-color-accents-plum-black effect-style-small-button-drop-shadow rounded"
                      value={editingInviteName}
                      onChange={(e) => setEditingInviteName(e.target.value)}
                      autoFocus
                    />
                    <button
                      className="flex-item mb-3"
                      onClick={() => handleSaveClick()}
                    >
                      <img src={SaveImage.src} alt="Save changes" width={32} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center edit-container">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white flex-item">
                      {invite.name || invite.id}
                    </p>
                    <img
                      className={`flex-item cursor-pointer ${
                        hoverInviteId === invite.id ? '' : 'hidden'
                      }`}
                      width={15}
                      src={EditImage.src}
                      alt="Edit the name"
                      onClick={() => handleEditClick(invite)}
                    />
                    <img
                      className={`flex-item cursor-pointer ${
                        hoverInviteId === invite.id ? '' : 'hidden'
                      }`}
                      width={15}
                      src={DeleteImage.src}
                      alt="Delete the invite"
                      onClick={() => handleDeleteClick(invite)}
                    />
                    <img
                      className={`flex-item cursor-pointer ${
                        hoverInviteId === invite.id ? '' : 'hidden'
                      }`}
                      width={18}
                      src={DollarImage.src}
                      alt="Top Up the invite"
                      onClick={() => onTopUpInvite && onTopUpInvite(invite)}
                    />
                  </div>
                )}
                <div
                  className="flex items-center text-sm text-gray-400"
                  onClick={() => {
                    copy(makeInviteUrl(invite.invite));
                    alert('Invite copied to clipboard');
                  }}
                >
                  <div>
                    <img
                      className="flex-item cursor-pointer"
                      src={Key.src}
                      alt="Click to copy the invite"
                      width={15}
                    />
                  </div>
                  <div
                    className="flex-item truncate blurred-text cursor-pointer"
                    title="Click to copy the invite"
                  >
                    0x5416f2b3c072a29e577b6fcfa2230671958aaa4c759bb2e37d4bd647632aa76c
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
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
                  className={`pagination-image ${
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
                  className={`pagination-image ${
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
    </div>
  );
};

export default Invites;
