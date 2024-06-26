-- CreateTable
CREATE TABLE `RolRealm` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaModificacion` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioRealm` (
    `id` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rolRealmId` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaModificacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UsuarioRealm_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Realm` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `template` VARCHAR(191) NULL,
    `colorPrimario` VARCHAR(191) NOT NULL,
    `colorSecundario` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `authType` ENUM('LOCAL', 'LDAP') NOT NULL DEFAULT 'LOCAL',
    `ldapUrl` VARCHAR(191) NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaModificacion` DATETIME(3) NOT NULL,
    `usuarioCreacionId` VARCHAR(191) NOT NULL,
    `usuarioModificacionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `linkedin` VARCHAR(191) NOT NULL,
    `realmId` VARCHAR(191) NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaModificacion` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuarioRealm` ADD CONSTRAINT `UsuarioRealm_rolRealmId_fkey` FOREIGN KEY (`rolRealmId`) REFERENCES `RolRealm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Realm` ADD CONSTRAINT `Realm_usuarioCreacionId_fkey` FOREIGN KEY (`usuarioCreacionId`) REFERENCES `UsuarioRealm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Realm` ADD CONSTRAINT `Realm_usuarioModificacionId_fkey` FOREIGN KEY (`usuarioModificacionId`) REFERENCES `UsuarioRealm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_realmId_fkey` FOREIGN KEY (`realmId`) REFERENCES `Realm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
