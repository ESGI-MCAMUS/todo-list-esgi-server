export const returnCode = {
  missingParameters: {
    code: 400,
    payload: {
      title: "missing_parameters",
      message: "Missing parameters!",
    },
  },
  unknownUser: {
    code: 400,
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
      message: "You need to authetificate before using this route!",
    },
  },
  internalError: {
    code: 500,
    payload: {
      title: "internal_server_error",
      message: "Internal server error! Check logs",
    },
  },
};

export interface Res {
  status: (code: number) => any;
  json: (json: any) => any;
}
