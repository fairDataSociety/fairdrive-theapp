import React, { useEffect } from 'react';
import { useTheme } from 'src/contexts/themeContext/themeContext';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import useStyles from './termsAndConditionsStyles';

function TermsAndConditions() {
  // Matomo
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({
      documentTitle: 'Terms and Conditions Page',
      href: 'https://app.fairdrive.fairdatasociety.org/',
    });
  }, []);

  const { theme } = useTheme();

  const classes = useStyles({ ...theme });

  return (
    <div className={classes.TermsAndConditions}>
      <h3 className={classes.title}>Terms of Usage</h3>
      <p className={classes.paragraph}>
        Present clarification expressly states that the provided not for profit,
        Fairdrive platform, created by independent developers, offers ‘’BETA
        VERSION’’, experimental services and is known to contain possible bugs
        and stability issues. Testing is the only purpose behind using the
        platform and independent developers working on it disclaim any liability
        for data loss, damage, or loss of profits incurred through use of the
        beta platform. Likewise, the developers disclaim all express and implied
        warranties for the application under test and the tester uses the app at
        their own risk. Furthermore, all future beta updates are subject to the
        same terms.
      </p>

      <h3 className={classes.title}>Disclaimer of Liability and Warranties:</h3>
      <p className={classes.paragraph}>
        IN NO EVENT SHALL THE FAIRDRIVE PLATFORM OR ITS INDEPENDENT DEVELOPERS
        AND SUPPLIERS BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT
        LIMITATION, DAMAGES FOR LOSS OF PROFITS, BUSINESS INTERRUPTION, LOSS OF
        INFORMATION) ARISING OUT OF THE USE OF OR INABILITY TO USE THE SOFTWARE,
        EVEN IF THE FAIRDRIVE PLATFORM PROVIDER HAS BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGE.
      </p>

      <h3 className={classes.title}>Users Commitments:</h3>
      <p className={classes.paragraph}>
        By using Fairdrive Beta Release you agree to report any flaws, errors or
        imperfections discovered on the platform or other materials where the
        user – Beta Tester has been granted access to the Fairdrive Beta
        Release. The user understands that prompt and accurate reporting is the
        purpose of the Fairdrive Beta Release and undertakes to use best efforts
        to provide frequent reports on all aspects of the product both positive
        and negative and acknowledges that any improvements, modifications and
        changes arising from or in connection with the Beta Testers contribution
        to the Fairdrive Project, remain or become the exclusive property of the
        Disclosing Party.
      </p>

      <h3 className={classes.title}>Analytics - Matomo</h3>
      <p className={classes.paragraph}>
        Fairdrive website and app uses the open source and self-hosted web
        analysis service Matomo. Matomo uses technologies that make it possible
        to recognize the user across multiple pages with the aim of analyzing
        the user patterns (e.g. cookies or device fingerprinting). The
        information recorded by Matomo about the use of this website will be
        stored on our server. Prior to archiving, the IP address will first be
        anonymized.
        <br />
        <br />
        Through Matomo, we are able to collect and analyze data on the use of
        our website by website visitors. This enables us to find out, for
        instance, when which page views occurred and from which region they
        came. In addition, we collect various log files (e.g. IP address,
        referrer, browser and operating system used) and can measure whether our
        website visitors perform certain actions (e.g. clicks, etc.).
        <br />
        <br />
        The use of this analysis tool is based on Art. 6 Sect. 1 lit. f GDPR.
        The website operator has a legitimate interest in the analysis of user
        patterns, in order to optimize the operator’s web offerings and
        advertising. If a corresponding agreement has been requested (e.g. an
        agreement to the storage of cookies), the processing takes place
        exclusively on the basis of Art. 6 para. 1 lit. a GDPR; the agreement
        can be revoked at any time.
        <br />
        <br />
        Completion of a data processing agreement We host Matomo on servers in
        Switzerland, so that all the data and analysis remains with us and is
        not passed on. The servers are provided by Exoscale and their Data
        Protection Agreement can be viewed at:
        <a
          href="https://www.exoscale.com/dpa/"
          rel="noreferrer"
          target="_blank"
        >
          https://www.exoscale.com/dpa/
        </a>
      </p>
      <p className={classes.paragraph}>
        You agree and acknowledge that these Terms and Conditions may change
        from time to time and you will review them periodically.
      </p>
    </div>
  );
}

export default React.memo(TermsAndConditions);
