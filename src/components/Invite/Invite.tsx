import { FC, useEffect, useState } from 'react';
import { Button } from '@components/Buttons';
import { useForm } from 'react-hook-form';
import {
  createInvite,
  getInvitesLocally,
  Invite,
  makeInviteUrl,
  saveInviteLocally,
  shareInvite,
  updateInviteLocally,
} from '@utils/invite';
import CelebrateImage from '@media/UI/invite/celebrate.png';
import { AuthenticationInput, TextInput } from '@components/Inputs';
import Confetti from 'react-confetti';
import { TopUpInviteModal } from '@components/Modals';
import { FieldError } from 'react-hook-form/dist/types/errors';
import Invites from '@components/Invites/Invites';
import CustomCheckbox from '@components/Inputs/CustomCheckbox/CustomCheckbox';
import { useFdpStorage } from '@context/FdpStorageContext';
import copy from 'copy-to-clipboard';

export const STEP_CREATE = 'create';
export const STEP_FILL = 'fill';
export const STEP_FINISH = 'finish';

export const PARTICIPATE_KEY_LOCAL_STORAGE = 'bb_participate';

interface InviteProps {}

const Invite: FC<InviteProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
  });
  const { errors } = formState;
  const [step, setStep] = useState<string>(STEP_CREATE);
  const [currentInvite, setCurrentInvite] = useState<Invite>(null);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [topUpModal, setTopUpModal] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const { wallet } = useFdpStorage();

  /**
   * When user click by Save name button
   */
  const onSaveInviteName = async (data: { name: string }) => {
    try {
      setStep(STEP_FINISH);
      const updatedInvite = { ...currentInvite, name: data.name };
      updateInviteLocally(updatedInvite);
      setCurrentInvite(updatedInvite);
      updateInvitesList();
      reset();
      // eslint-disable-next-line no-empty
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  /**
   * When user click by Create invite button
   */
  const onCreateInvite = () => {
    setStep(STEP_FILL);
    setLoading(true);
    setTimeout(() => {
      const invite = createInvite();
      setCurrentInvite(invite);
      saveInviteLocally(invite);
      updateInvitesList();
      setLoading(false);
      if (termsAccepted && wallet) {
        shareInvite(wallet.privateKey, invite.invite);
      }
    });
  };

  /**
   * When user want to create a new invite again
   */
  const onCreateAgain = () => {
    setStep(STEP_CREATE);
  };

  /**
   * Updates invites list from local storage reversed
   */
  const updateInvitesList = () => {
    setInvites(getInvitesLocally().reverse());
  };

  const onTermsClick = () => {
    const value = !termsAccepted;
    setTermsAccepted(value);
    localStorage.setItem(PARTICIPATE_KEY_LOCAL_STORAGE, value ? '1' : '0');
  };

  useEffect(() => {
    updateInvitesList();
    setTermsAccepted(
      localStorage.getItem(PARTICIPATE_KEY_LOCAL_STORAGE) === '1'
    );
  }, []);

  return (
    <>
      {topUpModal && (
        <TopUpInviteModal
          showModal={topUpModal}
          invite={currentInvite}
          closeModal={() => setTopUpModal(false)}
        />
      )}

      <div className="w-full mt-10 flex-col md:grid md:grid-cols-2 gap-6">
        <div className="md:border-r border-gray-300">
          {step === STEP_CREATE && (
            <>
              <div className="flex mt-10">
                <CustomCheckbox
                  name="confirm"
                  label="I want to participate in the award program."
                  onChange={onTermsClick}
                  checked={termsAccepted}
                />
                <div className="flex justify-start items-center underline">
                  <a
                    className="font-normal text-color-accents-plum-black dark:text-color-accents-soft-lavender text-sm"
                    href={process.env.NEXT_PUBLIC_BB_RULES_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rules.
                  </a>
                </div>
              </div>

              <div className="w-full step-create mt-8">
                <Button
                  disabled={loading}
                  variant="primary-outlined"
                  label="Create invite"
                  onClick={onCreateInvite}
                />
              </div>
            </>
          )}

          {step === STEP_FILL && (
            <>
              <div className="font-semibold text-l text-color-accents-plum-black dark:text-color-shade-white-night">
                Who do you want to invite?
              </div>
              <div className="step-fill sm:mx-5 mx-0">
                <form onSubmit={handleSubmit(onSaveInviteName)}>
                  <AuthenticationInput
                    id="name"
                    label=""
                    type="text"
                    name="name"
                    placeholder="Invitee name"
                    useFormRegister={register}
                    validationRules={{
                      minLength: {
                        value: 1,
                        message:
                          'Username field needs to contain at least 1 characters',
                      },
                    }}
                    error={errors.name as FieldError}
                  />

                  <div className="mt-5 flex sm:justify-start justify-between">
                    <Button
                      className="w-24 mr-4 mb-2"
                      disabled={loading}
                      variant="secondary"
                      centerText={true}
                      label="Skip"
                      type="submit"
                    />

                    <Button
                      className="w-24 mb-2"
                      disabled={loading}
                      variant="primary-outlined"
                      centerText={true}
                      label="Save"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </>
          )}

          {step === STEP_FINISH && (
            <div className="w-full step-finish">
              <Confetti numberOfPieces={1000} recycle={false} />
              <h1 className="mb-4 font-semibold text-3xl text-color-accents-purple-heavy dark:text-color-accents-soft-lavender leading-10">
                Hurrah!
              </h1>
              <div className="flex justify-center">
                <img
                  className="flex-item"
                  style={{ margin: 0 }}
                  src={CelebrateImage.src}
                  alt="Finish!"
                  width={150}
                />
              </div>

              <div className="pr-0 md:pr-4">
                <TextInput
                  name="folder"
                  label="Invite URL for sharing"
                  value={makeInviteUrl(currentInvite.invite)}
                  disabled={true}
                />
              </div>

              <div className="create-again flex flex-wrap justify-between mt-6 pr-4">
                <Button
                  className="primary-outlined w-60 mb-2 shrink-0 grow-0"
                  disabled={loading}
                  variant="primary"
                  centerText={true}
                  label="Copy"
                  onClick={() => copy(makeInviteUrl(currentInvite.invite))}
                />

                <Button
                  className="primary-outlined w-60 mb-2 shrink-0 grow-0"
                  disabled={loading}
                  variant="primary-outlined"
                  centerText={true}
                  label="New invite"
                  onClick={onCreateAgain}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 md:mt-0">
          <div className="font-semibold text-l text-color-accents-plum-black dark:text-color-shade-white-night">
            Invites Address Book
          </div>
          <div className="mt-10">
            <Invites
              ownerAddress={wallet?.address}
              invites={invites}
              updateInvites={updateInvitesList}
              onTopUpInvite={(invite) => {
                setStep(STEP_CREATE);
                setCurrentInvite(invite);
                setTopUpModal(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Invite;
