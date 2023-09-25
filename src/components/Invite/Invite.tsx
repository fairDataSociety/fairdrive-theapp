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
import { useLocales } from '@context/LocalesContext';

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
  const { intl } = useLocales();

  /**
   * When user click by Save name button
   */
  const onSaveInviteName = async (data: { name: string }) => {
    try {
      setStep(STEP_FINISH);
      const updatedInvite = { ...currentInvite, name: data.name };
      updateInviteLocally(updatedInvite, wallet.address);
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
      saveInviteLocally(invite, wallet.address);
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
    setInvites(getInvitesLocally(wallet.address).reverse());
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
              <div className="flex flex-col sm:flex-row mt-10">
                <CustomCheckbox
                  className="mb-3 sm:mb-0"
                  name="confirm"
                  onChange={onTermsClick}
                  checked={termsAccepted}
                >
                  {intl.get('AWARD_PROGRAM_CHECKBOX_LABEL')}{' '}
                  <a
                    className="underline"
                    href={process.env.NEXT_PUBLIC_BB_RULES_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {intl.get('RULES')}
                  </a>
                </CustomCheckbox>
              </div>

              <div className="w-full step-create mt-8 md:pr-4">
                <Button
                  disabled={loading}
                  className="w-full lg:w-auto"
                  centerText={true}
                  variant="primary-outlined"
                  label={intl.get('CREATE_INVITE')}
                  onClick={onCreateInvite}
                />
              </div>
            </>
          )}

          {step === STEP_FILL && (
            <>
              <div className="font-semibold text-l text-color-accents-plum-black dark:text-color-shade-white-night">
                {intl.get('TO_INVITE_QUESTION')}
              </div>
              <div className="step-fill sm:mr-4 mx-0">
                <form onSubmit={handleSubmit(onSaveInviteName)}>
                  <AuthenticationInput
                    id="name"
                    label=""
                    type="text"
                    name="name"
                    placeholder={intl.get('INVITEE_NAME')}
                    useFormRegister={register}
                    validationRules={{
                      minLength: {
                        value: 1,
                        message: intl.get('INVITEE_NAME_MIN_LENGTH_ERROR'),
                      },
                    }}
                    error={errors.name as FieldError}
                  />

                  <div className="mt-5 flex sm:justify-start justify-between">
                    <Button
                      className="mr-4 mb-2 w-full lg:w-24"
                      disabled={loading}
                      variant="secondary"
                      centerText={true}
                      label={intl.get('SKIP')}
                      type="submit"
                    />

                    <Button
                      className="mb-2 w-full lg:w-24"
                      disabled={loading}
                      variant="primary-outlined"
                      centerText={true}
                      label={intl.get('SAVE')}
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </>
          )}

          {step === STEP_FINISH && (
            <div className="w-full step-finish">
              <Confetti
                numberOfPieces={1000}
                recycle={false}
                width={window.innerWidth}
              />
              <h1 className="mb-4 font-semibold text-3xl text-color-accents-purple-heavy dark:text-color-accents-soft-lavender leading-10">
                {intl.get('HURRAH')}
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
                  label={intl.get('INVITE_URL_FOR_SHARING')}
                  value={makeInviteUrl(currentInvite.invite)}
                  disabled={true}
                />
              </div>

              <div className="create-again flex flex-wrap justify-between mt-6 lg:pr-4">
                <Button
                  className="primary-outlined w-full lg:w-60 mb-2 shrink-0 grow-0 md:mr-4"
                  disabled={loading}
                  variant="primary"
                  centerText={true}
                  label={intl.get('COPY')}
                  onClick={() => copy(makeInviteUrl(currentInvite.invite))}
                />

                <Button
                  className="primary-outlined w-full lg:w-60 mb-2 shrink-0 grow-0 md:mr-4 lg:mr-0"
                  disabled={loading}
                  variant="primary-outlined"
                  centerText={true}
                  label={intl.get('NEW_INVITE')}
                  onClick={onCreateAgain}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 md:mt-0">
          <div className="font-semibold text-l text-color-accents-plum-black dark:text-color-shade-white-night">
            {intl.get('INVITES_ADDRESS_BOOK')}
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
