export const returnCode = {
  missingToken: {
    code: 403,
    payload: {
      title: "missing_token",
      message: "Missing token, couldn't authenticate",
    },
  },
  invalidToken: {
    code: 401,
    payload: {
      title: "invalid_token",
      message: "Invalid token, couldn't authenticate",
    },
  },
  missingParameters: {
    code: 400,
    payload: {
      title: "missing_parameters",
      message: "Missing parameters!",
    },
  },
  unknownUser: {
    code: 404,
    payload: {
      title: "unknown_user",
      message:
        "Unknown user! The user you trying to get insn't present in the database.",
    },
  },
  unauthorized: {
    code: 401,
    payload: {
      title: "unauthorized",
      message: "You need to authentificate before using this route !",
    },
  },
  conflict: {
    code: 409,
    payload: {
      title: "conflict",
      message: "A conflict has been detected",
    },
  },
  internalError: {
    code: 500,
    payload: {
      title: "internal_server_error",
      message: "Internal server error! Check logs",
    },
  },
  user_created: {
    code: 201,
    payload: {
      title: "user_created",
      message: "The user has been created !",
    },
  },
  invalid_user: {
    code: 400,
    payload: {
      title: "invalid_user",
      message: "The user isn't valid !",
    },
  },
  user_exist: {
    code: 400,
    payload: {
      title: "user_exist",
      message: "The user already exist !",
    },
  },
  todo_created: {
    code: 201,
    payload: {
      title: "todo_created",
      message: "The todo has been created successfully!",
    },
  },
  todo_removed: {
    code: 201,
    payload: {
      title: "todo_removed",
      message: "The todo has been removed successfully!",
    },
  },
  todo_not_found: {
    code: 404,
    payload: {
      title: "todo_not_found",
      message: "Can find the todo!",
    },
  },
};

export interface Res {
  status: (code: number) => any;
  json: (json: any) => any;
}

export const todoFailPayload = (
  payload: "too_early" | "max_reached" | "over_1000_chars" | "already_exist"
): string => {
  switch (payload) {
    case "too_early":
      return "You must wait 30 minutes between two todos !";
      break;
    case "max_reached":
      return "You can't add more than 10 todos !";
      break;
    case "over_1000_chars":
      return "The todo content can't be longer than 1000 characters !";
      break;
    case "already_exist":
      return "The todo using this name already exist !";
      break;
  }
};
