import { FC, useEffect, useState } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { MainLayout } from '@components/Layouts';
import { Button } from '@components/Buttons';
import { useForm } from 'react-hook-form';
import {
  createInvite,
  getInvitesLocally,
  Invite,
  makeInviteUrl,
  saveInviteLocally,
  updateInviteLocally,
} from '@utils/invite';
import CelebrateImage from '@media/UI/invite/celebrate.png';
import Invites from '@pages/invites';
import { AuthenticationInput } from '@components/Inputs';
import Confetti from 'react-confetti';
import DisabledInput from '@components/Inputs/DisabledInput/DisabledInput';
import TopUpInviteModal from '@components/Modals/TopUpInviteModal/TopUpInviteModal';

export const STEP_CREATE = 'create';
export const STEP_FILL = 'fill';
export const STEP_FINISH = 'finish';

interface InviteProps {}

const Invite: FC<InviteProps> = () => {
  const { trackPageView } = useMatomo();
  const [href, setHref] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState, reset } = useForm({
    mode: 'all',
  });
  const { errors } = formState;
  const [step, setStep] = useState<string>(STEP_CREATE);
  const [currentInvite, setCurrentInvite] = useState<Invite>(null);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [topUpModal, setTopUpModal] = useState<boolean>(false);

  /**
   * When user click by Save name button
   */
  const onSaveInviteName = async (data: { name: string }) => {
    try {
      setLoading(true);
      setStep(STEP_FINISH);
      updateInviteLocally({ ...currentInvite, name: data.name });
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

  useEffect(() => {
    setHref(window.location.href);
    trackPageView({
      documentTitle: 'Invite Page',
      href,
    });
    updateInvitesList();
  }, []);

  return (
    <MainLayout>
      <h2 className="font-semibold text-xl text-color-accents-plum-black dark:text-color-shade-white-night">
        Invite Creation
      </h2>

      {topUpModal && (
        <TopUpInviteModal
          showModal={topUpModal}
          invite={currentInvite}
          closeModal={() => setTopUpModal(false)}
        />
      )}

      <div className="mt-10 grid grid-cols-2 gap-6">
        <div className="border-r border-gray-300">
          {step === STEP_CREATE && (
            <>
              <div className="w-full step-create">
                <div className="mt-10">
                  <Button
                    loading={loading}
                    disabled={loading}
                    variant="primary-outlined"
                    label="Create invite"
                    onClick={onCreateInvite}
                  />
                </div>
              </div>
            </>
          )}

          {step === STEP_FILL && (
            <>
              <div className="font-semibold text-l text-color-accents-plum-black dark:text-color-shade-white-night">
                Who do you want to invite?
              </div>
              <div className="step-fill mt-5 mr-40">
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    error={errors.name}
                  />

                  <div className="mt-5">
                    <Button
                      className="mr-4"
                      loading={loading}
                      disabled={loading}
                      variant="secondary"
                      label="Skip"
                      type="submit"
                    />

                    <Button
                      loading={loading}
                      disabled={loading}
                      variant="primary-outlined"
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
                  src={CelebrateImage.src}
                  alt="Finish!"
                  width={150}
                />
              </div>

              <div className="pr-4">
                <DisabledInput
                  name="folder"
                  label="Invite URL for sharing"
                  value={makeInviteUrl(currentInvite.invite)}
                />
              </div>

              <div className="sharing-box">
                <ul className="flex">
                  <li className="mr-2">[COPY URL]</li>
                  <li className="mr-2">[TWITTER]</li>
                  <li className="mr-2">[FACEBOOK]</li>
                  <li className="mr-2"></li>
                </ul>
              </div>

              <div className="create-again mt-6">
                <Button
                  className="primary-outlined mr-4"
                  loading={loading}
                  disabled={loading}
                  variant="primary"
                  label="Gift crypto to invitee"
                  onClick={() => setTopUpModal(true)}
                />

                <Button
                  className="primary-outlined"
                  loading={loading}
                  disabled={loading}
                  variant="primary-outlined"
                  label="Create new invite"
                  onClick={onCreateAgain}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="font-semibold text-l text-color-accents-plum-black dark:text-color-shade-white-night">
            Invites Address Book
          </div>
          <div className="mt-10">
            <Invites
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
    </MainLayout>
  );
};

export default Invite;
