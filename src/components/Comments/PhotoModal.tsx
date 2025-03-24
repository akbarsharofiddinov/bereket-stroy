import React from 'react'

interface IProps {
  children: React.ReactNode;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<string>>
}

const PhotoModal: React.FC<IProps> = ({ children, setSelectedPhoto }) => {
  return (
    <>
      <div className="modal photo-modal" onClick={() => setSelectedPhoto("")}>
        <div className="inner" onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  )
}

export default PhotoModal