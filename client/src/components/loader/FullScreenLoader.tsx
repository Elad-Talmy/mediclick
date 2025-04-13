import './FullScreenLoader.less';

export const FullScreenLoader = () => {
   return (
      <div className="fullscreen-loader">
         <div className="spinner" />
         <span>Loading Mediclick...</span>
      </div>
   );
};
