import react from 'react';
import Share from './Share';

export default ({ idea, setModalStatus }) => {
  return (
    <div className="dumpwall__ideacrad-modaWindow-overlay flex__center">
      <div className="dumpwall__ideacrad-modaWindow-iconsContainer flex__center">
        <p
          title="Close"
          className="dumpwall__ideacrad-modaWindow-modalClose p__bold"
          onClick={() => setModalStatus(false)}
        >
          X
        </p>
        <Share idea={idea} closeModal={setModalStatus} />
      </div>
    </div>
  );
};
