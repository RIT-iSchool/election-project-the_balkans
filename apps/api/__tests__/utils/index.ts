function isValidEmail(email: string): boolean {
  return /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function authenticateUser(username: string, password: string): boolean {
  if (username === 'member123' && password === 'password') {
    return true;
  } else {
    return false;
  }
}

function canAccessElection(
  userRole: string,
  userSocietyId: string | null,
  electionStatus: string,
): boolean {
  const societyId: string = 'FES';
  const isActiveElection: boolean = electionStatus === 'active';
  const isCompletedElection: boolean = electionStatus === 'inactive';

  switch (userRole) {
    case 'member':
      return societyId === userSocietyId && isActiveElection;
    case 'officer':
      return (
        societyId === userSocietyId && (isActiveElection || isCompletedElection)
      );
    case 'employee':
      return isActiveElection || isCompletedElection;
    case 'admin':
      return true;
    default:
      return false;
  }
}

export { isValidEmail, authenticateUser, canAccessElection };
