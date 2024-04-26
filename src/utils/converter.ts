export const accessToInt = (access: string) => {
  switch (access) {
    case "READ_ONLY":
      return 0
    case "READ_WRITE":
      return 1
    case "READ_WRITE_MODIFY":
      return 2
    case "ALL":
      return 3
    default:
      return 0
  }
}

export const typeToInt = (type: "ADD" | "EDIT" | "DELETE") => {
  switch (type) {
    case "ADD":
      return 1
    case "EDIT":
      return 2
    case "DELETE":
      return 3
    default:
      return 0
  }
}
