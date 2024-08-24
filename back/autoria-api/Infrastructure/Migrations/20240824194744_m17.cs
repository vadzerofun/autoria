using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class m17 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ByDate",
                table: "Subscribe");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Subscribe",
                newName: "subTime");

            migrationBuilder.AddColumn<DateTime>(
                name: "SubEndTime",
                table: "UserSubscribes",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubEndTime",
                table: "UserSubscribes");

            migrationBuilder.RenameColumn(
                name: "subTime",
                table: "Subscribe",
                newName: "EndDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "ByDate",
                table: "Subscribe",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
