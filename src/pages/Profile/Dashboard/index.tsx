import { useOutletContext, useParams } from "react-router-dom";
import { IContextType, IViewUser, IWideUser } from "../../../lib/types";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { BASE_URL, DEFAULT_COVER, DEFAULT_PIC } from "../../../lib/constantst";
import { useEffect, useRef, useState } from "react";
import {
  handleCoverUpload,
  handleGetUser,
  handlePictureUpload,
} from "../../../lib/api";

export function Dashboard() {
  const { account, setAccount, setViewUser } = useOutletContext<IContextType>();

  const [user, setUser] = useState<IWideUser>(account);

  const id = useParams().id;

  const photo = useRef<HTMLInputElement | null>(null);
  const cover = useRef<HTMLInputElement | null>(null);

  const handlePic = () => {
    if (photo.current) {
      const file = photo.current.files?.[0];
      if (file) {
        const form = new FormData();
        form.append("picture", file);

        handlePictureUpload(form).then((response) => {
          if (response.payload) {
            setAccount({ ...user, picture: response.payload as string });
          }
        });
      }
    }
  };

  const handleCover = () => {
    if (cover.current) {
      const file = cover.current.files?.[0];
      if (file) {
        const form = new FormData();
        form.append("cover", file);

        handleCoverUpload(form).then((response) => {
          if (response.payload) {
            setAccount({ ...user, cover: response.payload as string });
          }
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      handleGetUser(id).then((r) => {
        setUser(r.payload as IWideUser);
        setViewUser(r.payload as IViewUser);
      });
    }
  }, [id]);

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row">
                <MDBCardImage
                  onClick={() => !id && cover.current?.click()}
                  className="cover_img"
                  src={!user.cover ? DEFAULT_COVER : BASE_URL + user.cover}
                />

                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <MDBCardImage
                    src={!user.picture ? DEFAULT_PIC : BASE_URL + user.picture}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: "150px", zIndex: "1" }}
                    onClick={() => !id && photo.current?.click()}
                  />
                </div>
                <input
                  type="file"
                  ref={cover}
                  onChange={handleCover}
                  style={{ display: "none" }}
                />
                <input
                  type="file"
                  ref={photo}
                  onChange={handlePic}
                  style={{ display: "none" }}
                />
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <MDBTypography tag="h5" style={{ position: "relative" }}>
                    {user.name} {user.surname}
                  </MDBTypography>
                  <MDBCardText style={{ position: "relative" }}>
                    New York
                  </MDBCardText>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Photos
                    </MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">
                      {user.followers?.length}
                    </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Followers
                    </MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">
                      {user.following?.length}
                    </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Following
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBCardText className="font-italic mb-1">
                      Web Developer
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-1">
                      Lives in New York
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-0">
                      Photographer
                    </MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">
                    Recent photos
                  </MDBCardText>
                  <MDBCardText className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
