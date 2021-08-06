import React from 'react';
import { useTheme } from '../../store/themeContext/themeContext';
import useStyles from './termsAndConditionsStyles';

function TermsAndConditions() {
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

      <h3 className={classes.title}>Privacy</h3>
      <p className={classes.paragraph}>
        Fairdrive platform collects no data of its users whatsoever. It traces
        no cookies and makes use of no analytical tools. The privacy policy
        applied by Fair Data Society and thus Fairdrive platform is radical
        minimization of data.
      </p>
      <p className={classes.paragraph}>
        You agree and acknowledge that these Terms and Conditions may change
        from time to time and you will review them periodically.
      </p>
    </div>
  );
}

export default React.memo(TermsAndConditions);
