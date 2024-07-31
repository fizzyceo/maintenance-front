import React from "react";

function ImagesCell({ images }) {
  // console.log(images)
  return (
    <div className="w-100 overflow-hidden d-flex flex-wrap justify-content-center gap-2">
      {images &&
        images.map((obj,index) => (
          <a
            href={obj?.normal}
            key={index}
            target="_blank"
            rel="noreferrer"
            style={{ cursor: "pointer" }}
            // download={row.tenant.firstName}
          >
            <img
              src={obj?.small}
              alt="Maintenance Images"
              height="30px"
              width="30px"
              className="rounded"
            />
          </a>
        ))}
    </div>
  );
}

export { ImagesCell };
