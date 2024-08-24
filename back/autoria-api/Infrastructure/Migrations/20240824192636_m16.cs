using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class m16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarsId",
                table: "Subscribe");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Subscribe",
                newName: "Tittle");

            migrationBuilder.CreateTable(
                name: "UserSubscribes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CarsId = table.Column<string>(type: "TEXT", nullable: false),
                    SubscribeId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSubscribes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserSubscribes");

            migrationBuilder.RenameColumn(
                name: "Tittle",
                table: "Subscribe",
                newName: "UserId");

            migrationBuilder.AddColumn<string>(
                name: "CarsId",
                table: "Subscribe",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
