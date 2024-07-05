import React from "react";
import { UserModel } from "../models/UserModel";
import { useDispatch, useSelector } from "react-redux";
import { setFriend } from "../store/friendSlice";
import { RootState } from "../store/configureStore";

type Props = {
  friend: UserModel;
  unreadCount: number;
};

//  Not: it may be used with the new design, delete later!
const FriendsProfileCard: React.FC<Props> = ({ friend, unreadCount }) => {
  const dispatch = useDispatch();
  const selectedFriendId = useSelector(
    (state: RootState) => state.friend.friend?.id
  );

  const handleClick = () => {
    dispatch(setFriend(friend));
  };

  return (
    <div className="btn d-grid py-0 px-0" onClick={handleClick}>
      <div
        className={`card mb-3  ${
          friend.id === selectedFriendId ? "border-warning shadow p-3 bg-body-tertiary border border-2" : ""
        }`}
        style={{ height: "auto" }}
      >
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={friend.image}
              className="img-fluid rounded-circle border border-3 border-secondary"
              alt="profile"
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {friend.firstname + " " + friend.lastname}
                {unreadCount > 0 && (
                  <span className="badge ms-2 bg-danger">{unreadCount}</span>
                )}
              </h5>
              <p className="card-text">
                <small className="text-muted">
                  Last message received 3 mins ago
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FriendsProfileCard);
