type Props = {
  profilePicture: string | undefined;
};

export default function UserProfilePicture({ profilePicture }: Props) {
  return (
    <img
      src={
        profilePicture
          ? profilePicture
          : "https://forum.truckersmp.com/uploads/monthly_2019_09/imported-photo-12263.thumb.png.0a337947bd0458971e73616909a5b1f8.png"
      }
      alt="Profile Picture"
      className="w-10 h-10 rounded-full"
    />
  );
}
