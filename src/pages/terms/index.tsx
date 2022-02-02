import { FC, useEffect } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { AuthenticationLayout } from '@components/Layouts';

const Terms: FC = () => {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Terms & Conditions Page',
      href: 'https://fairdrive.vercel.app/terms',
    });
  }, []);

  return (
    <AuthenticationLayout hasBackButton={true}>
      <div className="w-full mb-12 pl-24 pr-28">
        <h2 className="font-semibold text-xl dark:text-color-accents-soft-lavender">
          Terms of Usage
        </h2>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          Present clarification expressly states that the provided not for
          profit, Fairdrive platform, created by independent developers, offers
          ‘’BETA VERSION’’, experimental services and is known to contain
          possible bugs and stability issues. Testing is the only purpose behind
          using the platform and independent developers working on it disclaim
          any liability for data loss, damage, or loss of profits incurred
          through use of the beta platform. Likewise, the developers disclaim
          all express and implied warranties for the application under test and
          the tester uses the app at their own risk. Furthermore, all future
          beta updates are subject to the same terms.
        </p>

        <h3 className="font-bold dark:text-color-accents-soft-lavender">
          Disclaimer of Liability and Warranties:
        </h3>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          IN NO EVENT SHALL THE FAIRDRIVE PLATFORM OR ITS INDEPENDENT DEVELOPERS
          AND SUPPLIERS BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT
          LIMITATION, DAMAGES FOR LOSS OF PROFITS, BUSINESS INTERRUPTION, LOSS
          OF INFORMATION) ARISING OUT OF THE USE OF OR INABILITY TO USE THE
          SOFTWARE, EVEN IF THE FAIRDRIVE PLATFORM PROVIDER HAS BEEN ADVISED OF
          THE POSSIBILITY OF SUCH DAMAGE.
        </p>

        <h3 className="font-bold dark:text-color-accents-soft-lavender">
          Users Commitments:
        </h3>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          By using Fairdrive Beta Release you agree to report any flaws, errors
          or imperfections discovered on the platform or other materials where
          the user – Beta Tester has been granted access to the Fairdrive Beta
          Release. The user understands that prompt and accurate reporting is
          the purpose of the Fairdrive Beta Release and undertakes to use best
          efforts to provide frequent reports on all aspects of the product both
          positive and negative and acknowledges that any improvements,
          modifications and changes arising from or in connection with the Beta
          Testers contribution to the Fairdrive Project, remain or become the
          exclusive property of the Disclosing Party.
        </p>

        <p className="my-5 font-normal text-base dark:text-color-accents-soft-lavender">
          © 2021 Fairdrive. All rights reserved
        </p>
      </div>
    </AuthenticationLayout>
  );
};

export default Terms;
