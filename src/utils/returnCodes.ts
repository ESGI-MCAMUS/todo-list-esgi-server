export const returnCode = {
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
};

export interface Res {
  status: (code: number) => any;
  json: (json: any) => any;
}
